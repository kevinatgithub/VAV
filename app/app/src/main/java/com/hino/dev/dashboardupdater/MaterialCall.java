package com.hino.dev.dashboardupdater;

import android.app.Dialog;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.TextView;

public class MaterialCall extends DashboardUpdater {

    private TextView lbl_chassisNumber;
    private Switch switch_isPending;
    private EditText txt_remarks;
    private Button btn_submit;
    private WipManufacturingOrder wipManufacturingOrder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_material_call);

        Toolbar toolbar = findViewById(R.id.app_bar);
        setSupportActionBar(toolbar);

        lbl_chassisNumber = findViewById(R.id.lbl_chassisNumber);
        switch_isPending = findViewById(R.id.switch_isPending);
        txt_remarks = findViewById(R.id.txt_remarks);
        btn_submit = findViewById(R.id.btn_submit);
        wipManufacturingOrder = gson.fromJson(callerIntent.getStringExtra("wipManufacturingOrder"),WipManufacturingOrder.class);

        if(wipManufacturingOrder != null){
            lbl_chassisNumber.setText(wipManufacturingOrder.getChassisNumber());
        }

        if(wipManufacturingOrder.getMcs() != null){
            switch_isPending.setChecked(wipManufacturingOrder.getPending());
            txt_remarks.setText(wipManufacturingOrder.getMcs().getRemarks());
        }



        btn_submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                submit();

            }
        });

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        finish();
        return super.onOptionsItemSelected(item);
    }

    private void submit() {
        final Dialog dialog = createNonDismissibleDialog(null);
        TextView txt_custom_dialog_message = dialog.findViewById(R.id.txt_custom_dialog_message);
        if (switch_isPending.isChecked()){
            txt_custom_dialog_message.setText("Flagging as pending");
        }else{
            txt_custom_dialog_message.setText("Flagging as material call");
        }
        dialog.show();

        ApiCallManager api = new ApiCallManager(this);
        api.flagAsMaterialCall(section.id,
                wipManufacturingOrder,
            switch_isPending.isChecked(),
            txt_remarks.getText().toString(),
            new Callback() {
                @Override
                public void execute() {
                    dialog.dismiss();
                    if(switch_isPending.isChecked()){
                        setResult(AppConstants.PENDING_SUCCESS);
                    }else{
                        setResult(AppConstants.MATERIAL_CALL_SUCCESS);
                    }
                    finish();
                }
            });
    }
}
