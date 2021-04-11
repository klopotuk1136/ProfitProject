import java.util.ArrayList;
import java.util.List;

public class AdFilter {
    private String vendor;
    private String dateUntil;
    private List<String> hashTags;
    public AdFilter(String vendor, String dateUntil, List<String> hashTags){
        this.dateUntil = dateUntil;
        this.vendor = vendor;
        this.hashTags = new ArrayList<>(hashTags);
    }

    public String getVendor() {
        return vendor;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public String getDateUntil() {
        return dateUntil;
    }
}
