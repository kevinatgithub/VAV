package com.hino.dev.dashboardupdater;

import android.app.Dialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.Request;

import org.json.JSONObject;
// TODO: 13/11/2018 Uncomment lines when testing on Actual Device, Do not forget to update manifest file too
import com.symbol.emdk.EMDKManager;
import com.symbol.emdk.EMDKResults;
import com.symbol.emdk.barcode.BarcodeManager;
import com.symbol.emdk.barcode.ScanDataCollection;
import com.symbol.emdk.barcode.Scanner;
import com.symbol.emdk.barcode.ScannerException;
import com.symbol.emdk.barcode.ScannerResults;

import java.util.ArrayList;


// TODO: 13/11/2018 Use 2nd line when testing on Actual Device
//public class Scan extends DashboardUpdater {
public class Scan extends DashboardUpdater implements EMDKManager.EMDKListener, Scanner.DataListener {

    private ApiCallManager api;
    private ImageView btn_scan;
    private EditText txt_chassisNumber;
    private TextView lbl_scanner_status;
    private WipManufacturingOrder wipManufacturingOrder;
    private Dialog dialog;
// TODO: 13/11/2018 Uncomment lines when testing on Actual Device
    private EMDKManager emdkManager;
    private BarcodeManager barcodeManager;
    private com.symbol.emdk.barcode.Scanner scanner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan);
        Toolbar toolbar = findViewById(R.id.app_bar);
        setSupportActionBar(toolbar);

        api = new ApiCallManager(this);
        btn_scan = findViewById(R.id.btn_scan);
        txt_chassisNumber = findViewById(R.id.txt_chassisNumber);
        lbl_scanner_status = findViewById(R.id.lbl_scanner_status);
// TODO: 13/11/2018 Uncomment lines when testing on Actual Device
        EMDKResults emdkResults = EMDKManager.getEMDKManager(getApplicationContext(),this);
        if(emdkResults.statusCode != EMDKResults.STATUS_CODE.SUCCESS){
            lbl_scanner_status.setText("SCANNER FAILED TO INITIALIZE!");
        }

        btn_scan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(!txt_chassisNumber.getText().equals("")){
                    dialog = createNonDismissibleDialog("Checking..");
                    dialog.show();
                    fetchChassisNumberDetails(new Callback() {
                        @Override
                        public void execute() {
                            executeAppropriateActionToWipChassisNumber();
                        }
                    }, txt_chassisNumber.getText().toString());

                }
            }
        });


    }

    private void executeAppropriateActionToWipChassisNumber(){
        if(wipManufacturingOrder != null){
            if(wipManufacturingOrder.getTimeIn() == null){
                timeIn();
            }else{
                timeOut();
            }
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // TODO: 13/11/2018 uncomment when testing in actual device
        releaseScanner();
        finish();
        return super.onOptionsItemSelected(item);
    }

    private void fetchChassisNumberDetails(final Callback CALLBACK, final String CHASSIS_NUMBER){


        api.fetchWipMODetails(section.id, CHASSIS_NUMBER, new CallbackWithResponse() {
            @Override
            public void execute(JSONObject response) {
                if(response != null){
                    wipManufacturingOrder = gson.fromJson(response.toString(),WipManufacturingOrder.class);
                    if(wipManufacturingOrder.getFinishedNormalEntry()){
                        Intent intent = new Intent(getApplicationContext(),ReturnToSection.class);
                        intent.putExtra("chassisNumber", wipManufacturingOrder.getChassisNumber());
                        startActivityForResult(intent,AppConstants.RETURN_TO_SECTION_REQUEST);
                    }else{
                        CALLBACK.execute();
                    }
                }
            }
        });
    }

    // Need to override this method to pass result to MOList.class after ReturnToSection.class is finished so SnackBar will show
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        setResult(resultCode,data);
        finish();
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void timeIn() {
        TextView txt_custom_dialog_message  = dialog.findViewById(R.id.txt_custom_dialog_message);
        txt_custom_dialog_message.setText("Timing-in");

        ApiCallManager api = new ApiCallManager(this);
        api.timeIn(section.id, wipManufacturingOrder.getChassisNumber(),new CallbackWithResponse() {
            @Override
            public void execute(JSONObject response) {
                dialog.dismiss();
                setResult(AppConstants.TIME_IN_SUCCESS,new Intent().putExtra("chassisNumber", wipManufacturingOrder.getChassisNumber()));
                finish();
            }
        });

    }

    private void timeOut() {
        TextView txt_custom_dialog_message  = dialog.findViewById(R.id.txt_custom_dialog_message);
        txt_custom_dialog_message.setText("Timing-out");

        ApiCallManager api = new ApiCallManager(this);
        api.timeOut(section.id, wipManufacturingOrder.getChassisNumber(),new CallbackWithResponse() {
            @Override
            public void execute(JSONObject response) {
                setResult(AppConstants.TIME_OUT_SUCCESS,new Intent().putExtra("chassisNumber", wipManufacturingOrder.getChassisNumber()));
                dialog.dismiss();
                finish();
            }
        });

    }

    // TODO: 13/11/2018 Uncomment lines when testing on Actual Device
    @Override
    public void onOpened(EMDKManager emdkManager) {
        this.emdkManager = emdkManager;

        try {
            initScanner();
        } catch (ScannerException e) {
            e.printStackTrace();
        }
        lbl_scanner_status.setText("");
    }

    @Override
    public void onClosed() {
        releaseScanner();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        releaseScanner();
    }

    @Override
    protected void onPause() {
        super.onPause();
        releaseScanner();
    }

    private void initScanner() throws ScannerException {
        if(scanner == null){
            barcodeManager = (BarcodeManager) this.emdkManager.getInstance(EMDKManager.FEATURE_TYPE.BARCODE);
            scanner = barcodeManager.getDevice(BarcodeManager.DeviceIdentifier.DEFAULT);
            scanner.addDataListener(this);
            scanner.triggerType = Scanner.TriggerType.SOFT_ALWAYS;
            scanner.enable();
            scanner.read();
        }
    }

    @Override
    public void onData(ScanDataCollection scanDataCollection) {
        new AsyncDataUpdate().execute(scanDataCollection);
    }

    private class AsyncDataUpdate extends AsyncTask<ScanDataCollection,Void,String> {

        @Override
        protected String doInBackground(ScanDataCollection... scanDataCollections) {
            String barcodeValue = "";
            ScanDataCollection scanCollection = scanDataCollections[0];

            if(scanCollection != null && scanCollection.getResult() == ScannerResults.SUCCESS){
                ArrayList<ScanDataCollection.ScanData> dataArray = scanCollection.getScanData();

                for(ScanDataCollection.ScanData data : dataArray){
                    barcodeValue = data.getData();
                }
            }
            return barcodeValue;
        }

        @Override
        protected void onPostExecute(String barcodeValue) {
            txt_chassisNumber.setText(barcodeValue);
            releaseScanner();

            dialog = createNonDismissibleDialog("Checking..");
            dialog.show();
            fetchChassisNumberDetails(new Callback() {
                @Override
                public void execute() {
                    executeAppropriateActionToWipChassisNumber();
                }
            }, txt_chassisNumber.getText().toString());
        }
    }

    private void releaseScanner(){
        if(emdkManager != null){
            emdkManager.release();
            emdkManager = null;
        }

        try{
            if(scanner != null){
                scanner.removeDataListener(this);
                scanner.disable();
                scanner = null;
            }
        } catch (ScannerException e) {
            e.printStackTrace();
        }
    }
}
