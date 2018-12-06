package com.hino.dev.dashboardupdater;

import android.app.Dialog;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.Snackbar;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MOPreview extends DashboardUpdater {

    private ConstraintLayout cl_mo_prevew;
    private ProgressBar progressBar;
    private ConstraintLayout cl_content;
    private TextView lbl_chassisNumber;
    private TextView lbl_taktTime;
    private TextView lbl_moNumber;
    private TextView lbl_moDate;
    private TextView lbl_dealer;
    private TextView lbl_customer;
    private TextView lbl_chassisModel;
    private TextView lbl_quantity;
    private Button btn_secondaryAction;
    private Button btn_primaryAction;
    private ImageView img_status;

    private String chassisNumber;
    private WipManufacturingOrder wipManufacturingOrder;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mopreview);

        cl_mo_prevew = findViewById(R.id.cl_mo_preview);
        progressBar = findViewById(R.id.progressBar2);
        cl_content = findViewById(R.id.cl_content);
        lbl_chassisNumber = findViewById(R.id.lbl_chassisNumber);
        lbl_taktTime = findViewById(R.id.lbl_taktTime);
        lbl_moNumber = findViewById(R.id.lbl_moNumber);
        lbl_moDate = findViewById(R.id.lbl_moDate);
        lbl_dealer = findViewById(R.id.lbl_dealer);
        lbl_customer = findViewById(R.id.lbl_customer);
        lbl_chassisModel = findViewById(R.id.lbl_chassisModel);
        lbl_quantity = findViewById(R.id.lbl_quantity);
        ImageView btn_cancel = findViewById(R.id.img_close);
        btn_secondaryAction = findViewById(R.id.btn_secondaryAction);
        btn_primaryAction = findViewById(R.id.btn_primaryAction);
        img_status = findViewById(R.id.img_status);

        btn_cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        chassisNumber = callerIntent.getStringExtra("chassisNumber");

    }

    @Override
    protected void onResume() {
        fetchDetails(new Callback() {
            @Override
            public void execute() {
                adjustActionHandlers();
            }
        });
        super.onResume();
    }

    private void fetchDetails(final Callback callback){
        ApiCallManager api = new ApiCallManager(this);
        api.fetchWipMODetails(section.id, chassisNumber, new CallbackWithResponse() {
            @Override
            public void execute(JSONObject response) {
                if(response != null){
                    wipManufacturingOrder = gson.fromJson(response.toString(),WipManufacturingOrder.class);
                    if(wipManufacturingOrder.getFinishedNormalEntry()){
                        Intent intent = new Intent(getApplicationContext(),ReturnToSection.class);
                        intent.putExtra("chassisNumber", wipManufacturingOrder.getChassisNumber());
                        startActivity(intent);
                        finish();
                    }else{
                        progressBar.setVisibility(View.GONE);
                        cl_content.setVisibility(View.VISIBLE);
                        callback.execute();
                    }
                }
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        Snackbar snackbar = Snackbar.make(cl_mo_prevew,"",Snackbar.LENGTH_LONG);
        switch(resultCode){
            case AppConstants.MATERIAL_CALL_SUCCESS:
                snackbar.setText(getResources().getString(R.string.success_material_call)).show();
                break;
            case AppConstants.PENDING_SUCCESS:
                snackbar.setText(getResources().getString(R.string.success_pending)).show();
                break;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void adjustActionHandlers(){

        lbl_chassisNumber.setText(wipManufacturingOrder.getChassisNumber());
        String workTimeStr = (wipManufacturingOrder.getWorkTime() != null ? wipManufacturingOrder.getWorkTime() : "0") + " MINS";
        lbl_taktTime.setText(workTimeStr);
        lbl_moNumber.setText(wipManufacturingOrder.getMoNumber());
        Date moDate = wipManufacturingOrder.makeMoDateStringAsDate();
        if(moDate != null){
            DateFormat targetMoDateFormat = new SimpleDateFormat("MM/dd/yyyy");
            lbl_moDate.setText(targetMoDateFormat.format(moDate));
        }
        lbl_dealer.setText(wipManufacturingOrder.getDealer());
        lbl_customer.setText(wipManufacturingOrder.getCustomer());
        lbl_chassisModel.setText(wipManufacturingOrder.getChassisModel());
        lbl_quantity.setText(wipManufacturingOrder.getMoQuantity().toString());

        if(wipManufacturingOrder.getMc()) {
            img_status.setVisibility(View.VISIBLE);
            img_status.setImageDrawable(getResources().getDrawable(R.drawable.badge_yellow));

            btn_primaryAction.setText("RESOLVE");
            btn_secondaryAction.setText("MATERIAL CALL");
            btn_primaryAction.setVisibility(View.VISIBLE);

            btn_primaryAction.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    resolve();
                }
            });

            btn_secondaryAction.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {materialCall();}
            });
        }else if(wipManufacturingOrder.getTimeIn() != null && wipManufacturingOrder.getFinishedNormalEntry()== false){
            img_status.setVisibility(View.VISIBLE);
            img_status.setImageDrawable(getResources().getDrawable(R.drawable.badge_green));
            btn_primaryAction.setVisibility(View.GONE);
            btn_secondaryAction.setText("MATERIAL CALL");
            btn_secondaryAction.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {materialCall();}
            });
        }

        if(wipManufacturingOrder.getTimeIn()!= null && wipManufacturingOrder.getRemainingTime()!= null){
            long checkInTimeInMinutes = wipManufacturingOrder.convertTimeInToMinutes();

            if(checkInTimeInMinutes >= wipManufacturingOrder.getRemainingTime()){
                img_status.setImageDrawable(getResources().getDrawable(R.drawable.badge_red));
                img_status.setVisibility(View.VISIBLE);
            }
        }else if(wipManufacturingOrder.getTimeIn() != null){
            long checkInTimeInMinutes = wipManufacturingOrder.convertTimeInToMinutes();

            if(checkInTimeInMinutes >= wipManufacturingOrder.getWorkTime()){
                img_status.setImageDrawable(getResources().getDrawable(R.drawable.badge_red));
                img_status.setVisibility(View.VISIBLE);
            }
        }

    }

    private void resolve() {
        final Dialog dialog = createNonDismissibleDialog("Resolving..");
        dialog.show();

        ApiCallManager api = new ApiCallManager(this);
        api.resolveWipMo(section.id, wipManufacturingOrder.getChassisNumber(), new Callback() {
            @Override
            public void execute() {
                setResult(AppConstants.RESOLVE_SUCCESS,new Intent().putExtra("chassisNumber", wipManufacturingOrder.getChassisNumber()));
                dialog.dismiss();
                finish();
            }
        });
    }

    private void materialCall() {
        Intent intent = new Intent(getApplicationContext(),MaterialCall.class);
        intent.putExtra("wipManufacturingOrder",gson.toJson(wipManufacturingOrder));
        startActivityForResult(intent, AppConstants.MATERIAL_CALL_REQUEST);
    }

    private void viewAttachments() {
        Intent intent = new Intent(getApplicationContext(),ViewAttachments.class);
        intent.putExtra("wipManufacturingOrder",gson.toJson(wipManufacturingOrder));
        startActivity(intent);
    }






}
