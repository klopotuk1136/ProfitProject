import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Ad {
    private String id;
    private String description;
    private String createdAt;
    private String link;
    private String vendor;
    private String photoLink;
    private List<String> hashTags;
    private String discount;
    private String validUntil;
    private int rating;
    private List<String> reviews;

    public Ad(String id, String description, String createdAt, String link,
              String vendor, String photoLink, List<String> hashTags,
              String discount, String validUntil, int rating,
              List<String> reviews){
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.link = link;
        this.vendor = vendor;
        this.photoLink = photoLink;
        this.hashTags = new ArrayList<>(hashTags);
        this.discount = discount;
        this.validUntil = validUntil;
        this.rating = rating;
        this.reviews = new ArrayList<>(reviews);
    }

    public Ad(Ad newAd){
        this.id = newAd.id;
        this.description = newAd.description;
        this.createdAt = newAd.createdAt;
        this.link = newAd.link;
        this.vendor = newAd.vendor;
        this.photoLink = newAd.photoLink;
        this.hashTags = new ArrayList<>(newAd.hashTags);
        this.discount = newAd.discount;
        this.validUntil = newAd.validUntil;
        this.rating = newAd.rating;
        this.reviews = new ArrayList<>(newAd.reviews);
    }

    @Override
    public String toString() {
        return "Ad{" +
                "id='" + id + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", link='" + link + '\'' +
                ", vendor='" + vendor + '\'' +
                ", photoLink='" + photoLink + '\'' +
                ", hashTags=" + hashTags +
                ", discount='" + discount + '\'' +
                ", validUntil=" + validUntil +
                ", rating=" + rating +
                ", reviews=" + reviews +
                '}';
    }

    public String getId(){
        return id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getValidUntil() {
        return validUntil;
    }

    public int getRating() {
        return rating;
    }

    public String getDiscount() {
        return discount;
    }

    public String getLink() {
        return link;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public String getVendor() {
        return vendor;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public List<String> getReviews() {
        return reviews;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public void setHashTags(List<String> hashTags) {
        Collections.copy(this.hashTags, hashTags);
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }
    public void setValidUntil(String validUntil){
        this.validUntil = validUntil;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setReviews(List<String> reviews) {
        Collections.copy(this.reviews, reviews);
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setVendor(String vendor) { this.vendor = vendor; }
}
