package com.hino.dev.dashboardupdater;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;


public class ApiCallManager {

    private Activity activity;
    private RequestQueue requestQueue;
    private Gson gson;
    private Session session;

    ApiCallManager(Activity activity) {
        this.activity = activity;
        this.gson = new Gson();
        this.requestQueue = Volley.newRequestQueue(activity);
        this.session = new Session(activity);
    }

    private String getDomainName(){
        String domain = session.getDomain();
        if(domain == null || domain.equals("")){
            return activity.getResources().getString(R.string.api_domain);
        }
        return domain;
    }

    void attemptLogin(final String USERNAME,final String PASSWORD,final CallbackWithResponse CALLBACK, final Callback ON_ERROR_CALLBACK){
        final String URL = getDomainName() + activity.getResources().getString(R.string.api_login)
                .replace("[username]",USERNAME)
                .replace("[password]",PASSWORD);

        executeApiCall(URL, Request.Method.GET,null, CALLBACK, ON_ERROR_CALLBACK);

    }

    void getWipList(final String SECTION_ID, final CallbackWithResponse CALLBACK){

        final String URL = getDomainName() + activity.getResources().getString(R.string.api_wip_list).replace("[sectionId]",SECTION_ID);

        executeApiCall(URL, JsonObjectRequest.Method.GET,null, CALLBACK, null);

    }

    void timeIn(final String SECTION_ID,final String CHASSIS_NUMBER, CallbackWithResponse callback){
        final String URL = getDomainName() + activity.getResources().getString(R.string.api_time_in);

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("sectionId",SECTION_ID);
            jsonObject.put("chassisNumber",CHASSIS_NUMBER);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        executeApiCall(URL, Request.Method.POST, jsonObject, callback, new Callback() {
            @Override
            public void execute() {
                activity.finish();
            }
        });
    }

    void timeOut(final String SECTION_ID,final String CHASSIS_NUMBER, CallbackWithResponse callback){
        final String URL = getDomainName() + activity.getResources().getString(R.string.api_time_out);

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("sectionId",SECTION_ID);
            jsonObject.put("chassisNumber",CHASSIS_NUMBER);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        executeApiCall(URL, Request.Method.PUT, jsonObject, callback,null);
    }

    void fetchWipMODetails(final String SECTION_ID, final String CHASSIS_NUMBER, final CallbackWithResponse CALLBACK){
        final String URL = getDomainName() + activity.getResources().getString(R.string.api_mo_chassis)
                .replace("[sectionId]",SECTION_ID)
                .replace("[chassisNumber]",CHASSIS_NUMBER);

        executeApiCall(URL, Request.Method.GET,null, CALLBACK, new Callback() {
            @Override
            public void execute() {
                activity.finish();
            }
        });
    }

    void flagAsMaterialCall(final String SECTION_ID, final WipManufacturingOrder WIP_MO, final boolean IS_PENDING, final String REMARKS, final Callback CALLBACK){

        final String url = getDomainName() + activity.getResources().getString(R.string.api_material_call);

        JSONObject params = new JSONObject();
        try {
            params.put("sectionId",SECTION_ID);
            params.put("chassisNumber",WIP_MO.getChassisNumber());
            params.put("isPending",IS_PENDING);
            params.put("remarks",REMARKS);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                WIP_MO.getMcs() != null ? JsonObjectRequest.Method.PUT : JsonObjectRequest.Method.POST,
                url,
                params,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        CALLBACK.execute();
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        activity.finish();
                    }
                }
        );

        requestQueue.add(jsonObjectRequest);
    }

    void resolveWipMo(final String SECTION_ID,final String CHASSIS_NUMBER, final Callback CALLBACK){

        final String URL = getDomainName() + activity.getResources().getString(R.string.api_resolve);

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("sectionId",SECTION_ID);
            jsonObject.put("chassisNumber", CHASSIS_NUMBER);
            jsonObject.put("isResolved",true);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        executeApiCall(URL, Request.Method.PUT, jsonObject, new CallbackWithResponse() {
            @Override
            public void execute(JSONObject response) {
                CALLBACK.execute();
            }
        }, new Callback() {
            @Override
            public void execute() {
                activity.finish();
            }
        });
    }

    void flagAsSpecChange(final String SECTION_ID,final String CHASSIS_NUMBER, final CallbackWithResponse CALLBACK){
        final String URL = getDomainName() + activity.getResources().getString(R.string.api_spec_change);

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("sectionId",SECTION_ID);
            jsonObject.put("chassisNumber",CHASSIS_NUMBER);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        executeApiCall(URL, Request.Method.POST, jsonObject, CALLBACK, new Callback() {
            @Override
            public void execute() {
                activity.finish();
            }
        });
    }

    private void executeApiCall(final String URL, final int METHOD, @Nullable final JSONObject jsonObject, final CallbackWithResponse CALLBACK, @Nullable final Callback ON_ERROR_CALLBACK){
        checkConnection(new Callback() {
            @Override
            public void execute() {

                requestQueue.add(
                        new JsonObjectRequest(METHOD, URL, jsonObject, new Response.Listener<JSONObject>() {
                                @Override
                                public void onResponse(JSONObject response) {
                                    CALLBACK.execute(response);
                                }
                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    handleAPIExceptionResponse(error);
                                    if(ON_ERROR_CALLBACK != null){
                                        ON_ERROR_CALLBACK.execute();
                                    }
                                }
                            }
                        )
                );
            }
        });
    }

    private void handleAPIExceptionResponse(VolleyError error){
        NetworkResponse networkResponse = error.networkResponse;

        Intent intent = new Intent(activity,ShowServerResponse.class);
        if(networkResponse == null){
            intent.putExtra("message","NETWORK ERROR " + activity.getResources().getString(R.string.api_error));
        }else if(networkResponse.statusCode == 400){
            String json = new String(networkResponse.data);
            ApiResponse response = gson.fromJson(json,ApiResponse.class);
            intent.putExtra("message",response.Message);
        }else{
            intent.putExtra("message","ERROR      "+networkResponse.statusCode+" " + activity.getResources().getString(R.string.api_error));
        }
        activity.startActivity(intent);
    }

    private void checkConnection(final Callback CALLBACK){

        ConnectivityManager conMgr =  (ConnectivityManager) activity.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = conMgr.getActiveNetworkInfo();
        if (netInfo == null){

            LayoutInflater inflater = LayoutInflater.from(activity);
            final AlertDialog DIALOG = new AlertDialog.Builder(activity).create();
            DIALOG.setTitle(activity.getResources().getString(R.string.internet_error_title));
            View customView = inflater.inflate(R.layout.network_fail,null);
            DIALOG.setView(customView);
            DIALOG.setCancelable(false);
            DIALOG.setButton(AlertDialog.BUTTON_POSITIVE, "TRY AGAIN", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialogInterface, int i) {
                    DIALOG.dismiss();
                    checkConnection(CALLBACK);
                }
            });

            DIALOG.setOnShowListener(new DialogInterface.OnShowListener() {
                @SuppressLint("ResourceAsColor")
                @Override
                public void onShow(DialogInterface dialogInterface) {
                    DIALOG.getButton(AlertDialog.BUTTON_POSITIVE).setTextColor(R.color.colorPrimary);
                }
            });
            DIALOG.show();
        }else{
            CALLBACK.execute();
        }
    }
}
