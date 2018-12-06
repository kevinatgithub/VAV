package com.hino.dev.dashboardupdater;

import android.support.design.widget.TextInputLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import static com.hino.dev.dashboardupdater.AppConstants.CHANGE_SETTINGS_RESET_SUCCESS;
import static com.hino.dev.dashboardupdater.AppConstants.CHANGE_SETTINGS_SUCCESS;

public class Settings extends AppCompatActivity {

    private Session session;
    private TextInputLayout tl_api_domain;
    private EditText txt_api_domain;
    private Button btn_save;
    private Button btn_reset;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        Toolbar toolbar = findViewById(R.id.app_bar);
        setSupportActionBar(toolbar);

        session = new Session(this);
        tl_api_domain = findViewById(R.id.tl_api_domain);
        txt_api_domain = findViewById(R.id.txt_api_domain);
        btn_save = findViewById(R.id.btn_save);
        btn_reset = findViewById(R.id.btn_reset);

        btn_save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                saveChanges();
            }
        });

        btn_reset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                restoreDefault();
            }
        });

        String domain = session.getDomain();
        if(domain == null){
            domain = getResources().getString(R.string.api_domain);
        }

        if(domain.startsWith("https://")){
            domain = domain.substring(8,domain.length());
        }

        txt_api_domain.setText(domain);
    }

    private void restoreDefault() {
        String domain = getResources().getString(R.string.api_domain);
        session.setDomain(domain);
        setResult(CHANGE_SETTINGS_RESET_SUCCESS);
        finish();
    }

    private void saveChanges() {
        String domain = txt_api_domain.getText().toString();
        if(domain.length() != 0){
            if(!domain.startsWith("https://")){
                domain = "https://" + domain;
            }
            session.setDomain(domain);
            setResult(CHANGE_SETTINGS_SUCCESS);
            finish();
        }else{
            tl_api_domain.setError("Invalid API Domain provided");
        }

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        finish();
        return super.onOptionsItemSelected(item);
    }
}
