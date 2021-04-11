import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class AdList {
    private List<Ad> ads;
    public AdList(){
        ads = new ArrayList<>();
        List<String> hashTags = new ArrayList<>();
        hashTags.add("tag1");
        hashTags.add("tag2");
        try {
            add(new Ad("1", "desc", "2021-01-29 20:12:32", "link1", "vend", "photo", hashTags, "12", "2022-01-21 20:12:32", 2, hashTags));
        }catch(ParseException e){

        }
    }
    public static boolean validateAd(Ad ad){
        return ad.getId() != null && ad.getId().length() >= 1 &&
                ad.getDescription() != null && ad.getDescription().length() <= 200 && ad.getDescription().length() >= 1 &&
                ad.getCreatedAt() != null &&
                ad.getLink() != null && ad.getLink().length() >= 1 &&
                ad.getVendor() != null && ad.getVendor().length() >= 1 &&
                ad.getHashTags() != null && ad.getHashTags().size() >= 1 && ad.getHashTags().size() <= 7 &&
                ad.getDiscount() != null && ad.getDiscount().length() >= 1 &&
                ad.getReviews() != null;
    }
    public boolean add(Ad ad){
        if (AdList.validateAd(ad)) {
            return ads.add(ad);
        }
        return false;
    }
    public Ad getAd(String id){
        for (Ad ad : ads) {
            if (ad.getId().equals(id)) {
                return ad;
            }
        }
        return null;
    }
    public boolean editAd(String id, Ad ad){
        Ad editingAd = getAd(id);
        if (editingAd == null) {
            return false;
        }

        if (ad == null || ad.getId() != null || ad.getVendor() != null || ad.getCreatedAt() != null) {
            return false;
        }

        if (ad.getDescription() != null) {
            editingAd.setDescription(ad.getDescription());
        }
        if (ad.getLink() != null) {
            editingAd.setLink(ad.getLink());
        }
        if (ad.getPhotoLink() != null) {
            editingAd.setPhotoLink(ad.getPhotoLink());
        }
        if (ad.getHashTags() != null) {
            editingAd.setHashTags(ad.getHashTags());
        }
        if (ad.getDiscount() != null) {
            editingAd.setDiscount(ad.getDiscount());
        }
        if (ad.getValidUntil() != null) {
            editingAd.setValidUntil(ad.getValidUntil());
        }
        if (ad.getRating() != -1) {
            editingAd.setRating(ad.getRating());
        }
        if (ad.getReviews() != null) {
            editingAd.setReviews(ad.getReviews());
        }
        return true;
    }
    public boolean removeAd(String id){
        Ad adToRemove = getAd(id);
        if (adToRemove == null) {
            return false;
        }
        return ads.remove(adToRemove);
    }
    public List<Ad> getAllAds(){
        return ads;
    }
}
