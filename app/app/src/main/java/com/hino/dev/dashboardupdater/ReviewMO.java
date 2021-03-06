package com.hino.dev.dashboardupdater;

import android.content.Intent;
import android.support.constraint.ConstraintLayout;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONObject;

public class ReviewMO extends DashboardUpdater {

    private ProgressBar pb_spinner;
    private ConstraintLayout cl_layout1;
    private ConstraintLayout cl_layout2;
    private ConstraintLayout cl_layout3;
    private ConstraintLayout cl_layout4;
    private ConstraintLayout cl_layout5;
    private ConstraintLayout cl_layout6;
    private ConstraintLayout cl_layout7;
    private TextView lbl_chassisNumber;
    private TextView lbl_chassisNumber_hint;
    private TextView lbl_taktTime;
    private TextView lbl_moNumber;
    private TextView lbl_moDate;
    private TextView lbl_dealer;
    private TextView lbl_customer;
    private TextView lbl_chassisModel;
    private TextView lbl_quantity;
    private ImageView img_cancel;
    private Button btn_viewAttachments;
    private Intent callerIntent;

    private WipManufacturingOrder wipManufacturingOrder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_review_mo);

        pb_spinner = findViewById(R.id.progressBar);
        cl_layout1 = findViewById(R.id.constraintLayout1);
        cl_layout2 = findViewById(R.id.constraintLayout2);
        cl_layout3 = findViewById(R.id.constraintLayout3);
        cl_layout4 = findViewById(R.id.constraintLayout4);
        cl_layout5 = findViewById(R.id.constraintLayout5);
        cl_layout6 = findViewById(R.id.constraintLayout6);
        cl_layout7 = findViewById(R.id.constraintLayout7);
        lbl_chassisNumber = findViewById(R.id.lbl_chassisNumber);
        lbl_chassisNumber_hint = findViewById(R.id.lbl_chassisNumber_hint);
        lbl_taktTime = findViewById(R.id.lbl_taktTime);
        lbl_moNumber = findViewById(R.id.lbl_moNumber);
        lbl_moDate = findViewById(R.id.lbl_moDate);
        lbl_dealer = findViewById(R.id.lbl_dealer);
        lbl_customer = findViewById(R.id.lbl_customer);
        lbl_chassisModel = findViewById(R.id.lbl_chassisModel);
        lbl_quantity = findViewById(R.id.lbl_quantity);
        img_cancel = findViewById(R.id.img_close);
        btn_viewAttachments = findViewById(R.id.btn_view_attachments);
        callerIntent = getIntent();

        img_cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
        
        btn_viewAttachments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                viewAttachments();
            }
        });

        fetchChassisNumberDetails();
    }

    private void viewAttachments() {
        Intent intent = new Intent(getApplicationContext(),ViewAttachments.class);
        intent.putExtra("wipManufacturingOrder",gson.toJson(wipManufacturingOrder));
        startActivity(intent);
    }

    private void fetchChassisNumberDetails(){
        final String CHASSIS_NUMBER = callerIntent.getStringExtra("chassisNumber");

        ApiCallManager api = new ApiCallManager(this);
        api.fetchWipMODetails(section.id, CHASSIS_NUMBER, new CallbackWithResponse() {
            @Override
            public void execute(JSONObject response) {
                if(response != null){
                    wipManufacturingOrder = gson.fromJson(response.toString(),WipManufacturingOrder.class);
                    populateFields();
                }
            }
        });
    }

    private void populateFields(){
        lbl_chassisNumber.setText(wipManufacturingOrder.getChassisNumber());
        lbl_moNumber.setText(wipManufacturingOrder.getMoNumber());
        lbl_moDate.setText(wipManufacturingOrder.getMoDate());
        lbl_dealer.setText(wipManufacturingOrder.getDealer());
        lbl_customer.setText(wipManufacturingOrder.getCustomer());
        lbl_chassisModel.setText(wipManufacturingOrder.getChassisModel());
        lbl_quantity.setText(wipManufacturingOrder.getMoQuantity()+ "");

        lbl_chassisNumber.setVisibility(View.VISIBLE);
        lbl_chassisNumber_hint.setVisibility(View.VISIBLE);
        img_cancel.setVisibility(View.VISIBLE);
        cl_layout1.setVisibility(View.VISIBLE);
        cl_layout2.setVisibility(View.VISIBLE);
        cl_layout3.setVisibility(View.VISIBLE);
        cl_layout4.setVisibility(View.VISIBLE);
        cl_layout5.setVisibility(View.VISIBLE);
        cl_layout6.setVisibility(View.VISIBLE);
        cl_layout7.setVisibility(View.VISIBLE);
        btn_viewAttachments.setVisibility(View.VISIBLE);
        pb_spinner.setVisibility(View.GONE);
    }
}
