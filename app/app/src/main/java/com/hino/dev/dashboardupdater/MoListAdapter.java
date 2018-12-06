package com.hino.dev.dashboardupdater;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class MoListAdapter extends ArrayAdapter<WipManufacturingOrder> {

    public MoListAdapter(Context context, ArrayList<WipManufacturingOrder> items){
        super(context, 0, items);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        WipManufacturingOrder mo = getItem(position);

        if(convertView == null){
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.mo_list_row, parent, false);
        }

        TextView chassis_no = convertView.findViewById(R.id.lbl_chassis_no);
        TextView status = convertView.findViewById(R.id.lbl_status);
        ImageView img_arrow = convertView.findViewById(R.id.img_arrow);

        img_arrow.setImageResource(R.drawable.ic_arrow_right);
        chassis_no.setText(mo.getChassisNumber());

        if(mo.getPending()) {
            status.setText("Pending");
        }else{
            status.setText("In Section");
        }
        return convertView;
    }
}
