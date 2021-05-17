package bsu.fpmi.profit;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Ad {
    private String id;
    private String label;
    private String description;
    private Date createdAt;
    private String link;
    private String vendor;
    private String photoLink;
    private List<String> hashTags;
    private String discount;
    private Date validUntil;
    private double rating;
    private List<String> reviews;

    public Ad(String id,String label, String description, String createdAt, String link,
              String vendor, String photoLink, List<String> hashTags,
              String discount, String validUntil, double rating,
              List<String> reviews){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            this.id = id;
            this.label = label;
            this.description = description;
            if(createdAt != null)
            this.createdAt = sdf.parse(createdAt);
            this.link = link;
            this.vendor = vendor;
            this.photoLink = photoLink;
            if(hashTags != null)
            this.hashTags = new ArrayList<>(hashTags);
            this.discount = discount;
            if(validUntil != null)
            this.validUntil = sdf.parse(validUntil);
            this.rating = rating;
            if(reviews != null)
            this.reviews = new ArrayList<>(reviews);
        }
        catch (ParseException e){}
    }

    @Override
    public String toString() {
        return "Ad{" +
                "id='" + id + '\'' +
                "label='" + label + '\'' +
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

    public String getLabel(){
        return label;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public double getRating() {
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

    public void setLabel(String label) {
        this.label = label;
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
        this.hashTags = hashTags;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }
    public void setValidUntil(Date validUntil){
        this.validUntil = validUntil;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setReviews(List<String> reviews) {
        this.reviews = reviews;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setVendor(String vendor) { this.vendor = vendor; }
}
