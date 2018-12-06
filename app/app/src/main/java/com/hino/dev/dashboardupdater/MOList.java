package com.hino.dev.dashboardupdater;

import android.app.Dialog;
import android.content.Intent;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

import static com.hino.dev.dashboardupdater.AppConstants.CHANGE_SETTINGS_REQUEST;
import static com.hino.dev.dashboardupdater.AppConstants.CHANGE_SETTINGS_RESET_SUCCESS;
import static com.hino.dev.dashboardupdater.AppConstants.CHANGE_SETTINGS_SUCCESS;

public class MOList extends DashboardUpdater {

    private boolean isBackButtonPressedOnce = false;

    final private int SECTION_LIST_REQUEST = 100;           //Set to 100 since REQUESTS code in DashboardUpdater.class is 1 and so on
    final static public int SECTION_LIST_RESPONSE_IS_SELECT_A_NEW_SECTION = 1;

    private ListView lv_mo;
    private ImageView img_info;
    private TextView lbl_info;
    private FloatingActionButton fab_scan;
    private DrawerLayout drawerLayout;
    private ActionBarDrawerToggle toggle;
    private NavigationView navView;
    private TextView nav_header_textView;
    private ApiCallManager api;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_molist);

        Toolbar toolbar = findViewById(R.id.app_bar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.drawer_layout);
        toggle = new ActionBarDrawerToggle(this,drawerLayout,toolbar,R.string.drawer_open,R.string.drawer_close);
        drawerLayout.addDrawerListener(toggle);

        api = new ApiCallManager(this);
        navView = findViewById(R.id.nav_view);
        lv_mo = findViewById(R.id.lv_mo);
        img_info = findViewById(R.id.img_info);
        lbl_info = findViewById(R.id.lbl_info);
        fab_scan = findViewById(R.id.fab_scan);


        lv_mo.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long l) {
                WipManufacturingOrder wipChasisNumber = (WipManufacturingOrder) lv_mo.getItemAtPosition(position);
                Intent intent = new Intent(getApplicationContext(),MOPreview.class);
                intent.putExtra("chassisNumber",wipChasisNumber.getChassisNumber());
                startActivityForResult(intent,AppConstants.SCAN_REQUEST);
            }
        });

        fab_scan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(),Scan.class);
                startActivityForResult(intent,AppConstants.SCAN_REQUEST);
            }
        });

        navView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                int id = menuItem.getItemId();
                switch (id){
                    case R.id.settings:
                        Intent settings = new Intent(getApplicationContext(), Settings.class);
                        startActivityForResult(settings,CHANGE_SETTINGS_REQUEST);
                        break;
                    case R.id.sections:
                        Intent sections = new Intent(getApplicationContext(), Sections.class);
                        startActivityForResult(sections,SECTION_LIST_REQUEST);
                        break;
                    case R.id.logout:
                        session.removeUser();
                        session.removeSection();
                        Intent login = new Intent(getApplicationContext(), Login.class);
                        startActivity(login);
                        finish();
                        break;
                }
                return false;
            }
        });


    }

    @Override
    public void onBackPressed() {
        if (isBackButtonPressedOnce) {
            super.onBackPressed();
            return;
        }

        this.isBackButtonPressedOnce = true;
        Toast.makeText(this, "Press BACK again to exit", Toast.LENGTH_SHORT).show();

        new Handler().postDelayed(new Runnable() {

            @Override
            public void run() {
                isBackButtonPressedOnce =false;
            }
        }, 2000);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable final Intent data) {
        switch (requestCode){
            case AppConstants.SCAN_REQUEST:
            case AppConstants.RETURN_TO_SECTION_REQUEST:

                switch(resultCode){
                    case AppConstants.TIME_IN_SUCCESS:
                        showSnackBar(drawerLayout,data,getResources().getString(R.string.success_time_in));
                        break;
                    case AppConstants.TIME_OUT_SUCCESS:
                        showSnackBar(drawerLayout,data,getResources().getString(R.string.success_time_out));
                        break;
                    case AppConstants.RESOLVE_SUCCESS:
                        showSnackBar(drawerLayout,data,getResources().getString(R.string.success_resolve));
                        break;
                    case AppConstants.SPEC_CHANGE_SUCCESS:
                        showSnackBar(drawerLayout,data,getResources().getString(R.string.success_spec_change));
                        break;
                    case AppConstants.BACK_JOB_SUCCESS:
                        showSnackBar(drawerLayout,data,getResources().getString(R.string.success_back_job));
                        break;
                }

                break;
            case SECTION_LIST_REQUEST:

                switch(resultCode){
                    case SECTION_LIST_RESPONSE_IS_SELECT_A_NEW_SECTION:
                        finish();
                        break;
                }
                break;
            case CHANGE_SETTINGS_REQUEST:

                switch(resultCode){
                    case CHANGE_SETTINGS_SUCCESS:
                        showSnackBar(drawerLayout,data,"Settings Saved");
                        break;
                    case CHANGE_SETTINGS_RESET_SUCCESS:
                        showSnackBar(drawerLayout,data,"Settings has been reset");
                        break;
                }
                break;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void refreshWipListEvery15Seconds(){
        new android.os.Handler().postDelayed(
        new Runnable() {
            public void run() {
                fetchWipList(false);
                refreshWipListEvery15Seconds();
            }
        },
        15000);
    }

    // Model Class for the API Response
    private class ApiResponseWipChassisNumbers {
        public String sectionId;
        public WipManufacturingOrder[] wipChassisNumbers;

        public ApiResponseWipChassisNumbers(String sectionId, WipManufacturingOrder[] wipManufacturingOrders) {
            this.sectionId = sectionId;
            this.wipChassisNumbers = wipManufacturingOrders;
        }
    }

    // Used in sorting the Chassis Numbers response from API
    private class WipChassisNumbersComparator implements Comparator<WipManufacturingOrder>{

        @Override
        public int compare(WipManufacturingOrder left, WipManufacturingOrder right) {
            return left.getChassisNumber().compareTo(right.getChassisNumber());
        }
    }

    private void fetchWipList(final boolean SHOW_LOADING){

        final Dialog DIALOG = createNonDismissibleDialog("Loading..");
        if(SHOW_LOADING){
            DIALOG.show();
        }

        api.getWipList(section.id,new CallbackWithResponse() {
            @Override
            public void execute(JSONObject response) {
                if(SHOW_LOADING){
                    DIALOG.dismiss();
                }
                populateListView(response);
            }
        });
    }

    private void populateListView(JSONObject response){
        if(response != null){
            ApiResponseWipChassisNumbers ar = gson.fromJson(response.toString(),ApiResponseWipChassisNumbers.class);
            if(ar.wipChassisNumbers != null){
                ArrayList<WipManufacturingOrder> wipChasisNumbers = new ArrayList<WipManufacturingOrder>(Arrays.asList(ar.wipChassisNumbers));

                if(wipChasisNumbers.size() > 0){
                    Collections.sort(wipChasisNumbers,new WipChassisNumbersComparator());
                    MoListAdapter moListAdapter = new MoListAdapter(getApplicationContext(),wipChasisNumbers);
                    lv_mo.setAdapter(moListAdapter);
                    lv_mo.setVisibility(View.VISIBLE);
                    img_info.setVisibility(View.GONE);
                    lbl_info.setVisibility(View.GONE);
                }else{
                    lv_mo.setVisibility(View.GONE);
                    img_info.setVisibility(View.VISIBLE);
                    lbl_info.setVisibility(View.VISIBLE);
                }
            }

        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        fetchWipList(false);
//        refreshWipListEvery15Seconds();     //Will be removed if not necessary
    }
}
