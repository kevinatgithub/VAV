package com.hino.dev.dashboardupdater;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.WindowManager;
import android.widget.TextView;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

public class DashboardUpdater extends AppCompatActivity {



    protected Intent callerIntent;
    protected Session session;
    protected User user;
    protected User.Section section;
    protected RequestQueue requestQueue;
    protected Gson gson;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        callerIntent = getIntent();
        session = new Session(DashboardUpdater.this);
        user = session.getUser();
        section = session.getSection();
        requestQueue = Volley.newRequestQueue(DashboardUpdater.this);
        gson = new Gson();
    }

    protected Dialog createNonDismissibleDialog(@Nullable String dialogMessage){
        Dialog dialog = new Dialog(DashboardUpdater.this);
        dialog.setContentView(R.layout.custom_dialog);
        TextView txt_custom_dialog_message = dialog.findViewById(R.id.txt_custom_dialog_message);
        if(dialogMessage != null){
            txt_custom_dialog_message.setText(dialogMessage);
        }
        WindowManager.LayoutParams lp = new WindowManager.LayoutParams();
        lp.copyFrom(dialog.getWindow().getAttributes());
        lp.width = WindowManager.LayoutParams.MATCH_PARENT;
        dialog.getWindow().setAttributes(lp);
        dialog.setCancelable(false);
        return dialog;
    }

    protected void showSnackBar(View container,Intent data,String message){
        Snackbar snackbar = Snackbar.make(container,message,Snackbar.LENGTH_LONG);
        if(data != null){
            final String CHASSIS_NUMBER = data.getStringExtra("chassisNumber");
            snackbar.setAction("VIEW", new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(DashboardUpdater.this,MOPreview.class);
                    intent.putExtra("chassisNumber",CHASSIS_NUMBER);
                    startActivity(intent);
                }
            });
            snackbar.setActionTextColor(Color.parseColor("#06d73e"));
        }
        snackbar.show();
    }


}
