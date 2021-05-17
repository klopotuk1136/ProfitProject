package bsu.fpmi.profit;

public class Review {
    private String username;
    private String review;
    private int rating;
    private String reviewDate;
    public Review(String username, String review, int rating, String reviewDate){
        this.rating = rating;
        this.reviewDate = reviewDate;
        this.username = username;
        this.review = review;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getRating() {
        return rating;
    }

    public String getReview() {
        return review;
    }


    public String getReviewDate() {
        return reviewDate;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getUsername() {
        return username;
    }

    public void setReviewDate(String reviewDate) {
        this.reviewDate = reviewDate;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
