package bsu.fpmi.profit;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AdFilter {
    private String vendor;
    private String validUntil;
    private List<String> hashTags;
    public AdFilter(String vendor, String validUntil, List<String> hashTags){
        System.out.println(validUntil);
        this.validUntil = validUntil;
        this.vendor = vendor;
        this.hashTags = new ArrayList<>(hashTags);
    }

    public String getVendor() {
        return vendor;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public String getValidUntil() {
        return validUntil;
    }

    public Date getDateValidUntil(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try{
            return sdf.parse(validUntil);
        }catch(ParseException e){
            System.out.println(e.getStackTrace());
        }
        return null;
    }

    @Override
    public String toString() {
        return "AdFilter{" +
                "vendor='" + vendor + '\'' +
                ", validUntil='" + validUntil + '\'' +
                ", hashTags=" + hashTags +
                '}';
    }
}
