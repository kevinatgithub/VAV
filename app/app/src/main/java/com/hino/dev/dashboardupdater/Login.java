package com.hino.dev.dashboardupdater;

import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TextInputLayout;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.android.volley.Request;

import org.json.JSONObject;

public class Login extends DashboardUpdater {

    private TextInputLayout tl_username;
    private TextView txt_username;
    private TextInputLayout tl_password;
    private TextView txt_password;
    private Button btn_login;
    private Dialog dialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Toolbar toolbar = findViewById(R.id.app_bar);
        setSupportActionBar(toolbar);

        if(session.getUser() != null){
            if(session.getSection() != null){
                Intent intent = new Intent(this,MOList.class);
                startActivity(intent);
            }else{
                Intent intent = new Intent(this,Sections.class);
                startActivity(intent);
            }
            finish();
        }

        dialog = createNonDismissibleDialog("Logging-in");
        tl_username = findViewById(R.id.tl_username);
        txt_username = findViewById(R.id.txt_username);
        tl_password = findViewById(R.id.tl_password);
        txt_password = findViewById(R.id.txt_password);

        btn_login = findViewById(R.id.btn_login);

        btn_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                validateLoginForm();
            }
        });
    }

    private void validateLoginForm(){

        tl_username.setError(null);
        tl_password.setError(null);

        if(txt_username.getText().length() != 0 && txt_password.getText().length() != 0){

            dialog.show();

            ApiCallManager api = new ApiCallManager(this);
            api.attemptLogin(txt_username.getText().toString(),txt_password.getText().toString(), new CallbackWithResponse() {
                @Override
                public void execute(JSONObject response) {
                    if(response != null){
                        User user = gson.fromJson(response.toString(),User.class);
                        session.setUser(user);
                        if(user.sections.length == 1){
                            session.setSection(user.sections[0]);
                            Intent intent = new Intent(getApplicationContext(),MOList.class);
                            startActivity(intent);
                        }else{
                            Intent intent = new Intent(getApplicationContext(),Sections.class);
                            startActivity(intent);
                        }
                        finish();
                    }
                }
            },new Callback() {
                @Override
                public void execute() {
                    dialog.dismiss();
                }
            });


        }else{
            if(txt_username.getText().length() == 0){
                tl_username.setError("Please enter Username.");
            }
            if(txt_password.getText().length() == 0){
                tl_password.setError("Please enter Password.");
            }
        }
    }

}
