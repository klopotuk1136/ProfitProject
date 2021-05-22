package bsu.fpmi.profit;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProfitCRUD {
    private String url;
    private String name;
    private String password;
    private Connection connection;
    public ProfitCRUD(String url, String name, String password){
        this.url = url;
        this.name = name;
        this.password = password;
    }
    public boolean connect(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            this.connection = DriverManager.getConnection(url, name, password);
            return true;
        }catch (ClassNotFoundException e){
            e.printStackTrace();
        } catch(SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public Connection getConnection(){
        return connection;
    }

    public static boolean validateOffer(Ad ad) {
        return ad.getId() != null && ad.getId().length() >= 1 &&
                ad.getLabel() != null && ad.getLabel().length() >= 1 &&
                ad.getDescription() != null && ad.getDescription().length() <= 200 && ad.getDescription().length() >= 1 &&
                ad.getCreatedAt() != null &&
                ad.getLink() != null && ad.getLink().length() >= 1 &&
                ad.getVendor() != null && ad.getVendor().length() >= 1 &&
                ad.getHashTags() != null && ad.getHashTags().size() >= 1 && ad.getHashTags().size() <= 7 &&
                ad.getDiscount() != null && ad.getDiscount().length() >= 1 &&
                ad.getReviews() != null;
    }

    private PreparedStatement buildAddPreparedStatement(int offerId, int userId, Ad offer) throws SQLException {
        String sql = "INSERT INTO OFFER(OFFER_ID, USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, offerId);
        preparedStatement.setInt(2, userId);
        preparedStatement.setString(3, offer.getLabel());
        preparedStatement.setString(4, offer.getDescription());
        preparedStatement.setString(5, offer.getLink());
        preparedStatement.setDate(6, new java.sql.Date(offer.getValidUntil().getTime()));
        preparedStatement.setInt(7, Integer.parseInt(offer.getDiscount()));
        preparedStatement.setTimestamp(8, new java.sql.Timestamp(offer.getCreatedAt().getTime()));
        preparedStatement.setString(9, offer.getPhotoLink());
        return preparedStatement;
    }

    private void addHashtags(Ad offer, int offerId) throws SQLException {
        String sql = "INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (?, ?);";
        for (String tag : offer.getHashTags()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, offerId);
            preparedStatement.setString(2, tag);
            preparedStatement.executeUpdate();
            preparedStatement.close();
        }
    }

    public boolean addOffer(Ad offer){
        if(validateOffer(offer)) {
            try {

                String sql = "select user_id from user where username = ?";
                PreparedStatement preparedStatement = connection.prepareStatement(sql);
                preparedStatement.setString(1, offer.getVendor());
                ResultSet resultSet = preparedStatement.executeQuery();


                int userId;
                if (resultSet.next()) {
                    userId = resultSet.getInt("user_id");
                    preparedStatement.close();
                    int offerId = (int) (offer.getCreatedAt().getTime() % Integer.MAX_VALUE);

                    preparedStatement = buildAddPreparedStatement(offerId, userId, offer);

                    preparedStatement.executeUpdate();
                    preparedStatement.close();

                    addHashtags(offer, userId);

                    return true;
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    private String getEditSqlString(Ad ad){
        StringBuilder sb = new StringBuilder("update offer set ");
        if(ad.getLabel() != null && ad.getLabel().length() != 0){
            sb.append("OFFER_NAME = ?, ");
        }
        if (ad.getDescription() != null && ad.getDescription().length() != 0) {
            sb.append("DESCRIPTION = ?, ");
        }
        if (ad.getLink() != null) {
            sb.append("VENDOR_LINK = ?, ");
        }
        if (ad.getPhotoLink() != null) {
            sb.append("PHOTO_LINK = ?, ");
        }
        if (ad.getDiscount() != null) {
            sb.append("DISCOUNT = ?, ");
        }
        if (ad.getValidUntil() != null) {
            sb.append("VALID_UNTIL = ?, ");
        }
        sb.deleteCharAt(sb.length() - 2);
        sb.append("where offer_id = ?");
        return sb.toString();
    }

    private void editHashtags(String id, Ad ad) throws SQLException{
        String sql = "delete from hashtags where offer_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, Integer.parseInt(id));
        preparedStatement.executeUpdate();
        preparedStatement.close();
        sql = "INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (?, ?);";
        for (String tag : ad.getHashTags()) {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, Integer.parseInt(id));
            preparedStatement.setString(2, tag);
            preparedStatement.executeUpdate();
            preparedStatement.close();
        }
    }

    private PreparedStatement buildEditPreparedStatement( Ad ad, String id) throws SQLException {
        if (ad == null || ad.getId() != null || ad.getVendor() != null || ad.getCreatedAt() != null) {
            return null;
        }
        String sql = getEditSqlString(ad);
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        int i = 1;
        if(ad.getLabel() != null && ad.getLabel().length() != 0){
            preparedStatement.setString(i++, ad.getLabel());
        }
        if (ad.getDescription() != null && ad.getDescription().length() != 0) {
            preparedStatement.setString(i++, ad.getDescription());
        }
        if (ad.getLink() != null) {
            preparedStatement.setString(i++, ad.getLink());
        }
        if (ad.getPhotoLink() != null) {
            preparedStatement.setString(i++, ad.getPhotoLink());
        }
        if (ad.getDiscount() != null) {
            preparedStatement.setString(i++, ad.getDiscount());
        }
        if (ad.getValidUntil() != null) {
            preparedStatement.setDate(i++, new java.sql.Date(ad.getValidUntil().getTime()));
        }
        preparedStatement.setInt(i, Integer.parseInt(id));
        return  preparedStatement;
    }

    public boolean editOffer(String id, Ad ad){
        try{
            PreparedStatement preparedStatement = buildEditPreparedStatement(ad, id);
            if(preparedStatement != null) {
                preparedStatement.executeUpdate();
                preparedStatement.close();

                if (ad.getHashTags() != null) {
                    editHashtags(id, ad);
                }

                return true;
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteAd(String id){
        try{
            String sql = "delete from offer where offer_id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, Integer.parseInt(id));
            preparedStatement.executeUpdate();
            return true;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    private List<String> readTags(String id) throws SQLException {
        List<String> tags = new ArrayList<>();

        String sql = "select * from hashtags where offer_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, Integer.parseInt(id));
        ResultSet rs = preparedStatement.executeQuery();
        while(rs.next()){
            tags.add(rs.getString("tag"));
        }
        rs.close();
        preparedStatement.close();
        return tags;
    }

    private class ReviewsWrapper{
        private List<String> reviews;
        private double rating;

        public List<String> getReviews() {
            return reviews;
        }

        public double getRating() {
            return rating;
        }

        public void setRating(double rating) {
            this.rating = rating;
        }

        public void setReviews(List<String> reviews) {
            this.reviews = reviews;
        }
    }

    private ReviewsWrapper readReviews(String id) throws SQLException {
        List<String> reviews = new ArrayList<>();
        ReviewsWrapper rw = new ReviewsWrapper();
        double rating = 0.0;
        int amountReviews = 0;
        String sql = "select * from reviews where offer_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, Integer.parseInt(id));
        ResultSet rs = preparedStatement.executeQuery();
        while(rs.next()){
            rating += rs.getInt("rating");
            amountReviews++;
            reviews.add(rs.getString("review"));
        }
        if(amountReviews != 0) {
            rating /= amountReviews;
        }

        rw.setRating(rating);
        rw.setReviews(reviews);
        return rw;
    }

    private Ad readOffer(String id, List<String> tags, List<String> reviews, double rating) throws SQLException {
        String sql = "select * from offer " +
                "left join user on offer.user_id=user.user_id " +
                "where offer_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, Integer.parseInt(id));
        ResultSet rs = preparedStatement.executeQuery();
        if(rs.next()){
            Ad offer = new Ad(id,
                    rs.getString("offer_name"),
                    rs.getString("description"),
                    rs.getString("created_at"),
                    rs.getString("vendor_link"),
                    rs.getString("username"),
                    rs.getString("photo_link"),
                    tags,
                    rs.getString("discount"),
                    rs.getString("valid_until"),
                    rating,
                    reviews);
            return offer;
        }
        else{
            return null;
        }
    }

    public Ad getOffer(String id){
        try{
            List<String> tags = readTags(id);


            ReviewsWrapper rw = readReviews(id);
            List<String> reviews = rw.getReviews();
            double rating = rw.getRating();
            return readOffer(id, tags, reviews, rating);

        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }

    private String buildFilterString(AdFilter filter) {
        boolean emptyFilter = true;
        StringBuilder sb = new StringBuilder("WHERE ");
        if (filter.getValidUntil() != null) {
            sb.append("VALID_UNTIL >= ? AND ");
            emptyFilter = false;

        }
        if (filter.getVendor() != null) {
            sb.append("USERNAME = ? AND ");
            emptyFilter = false;
        }
        sb.delete(sb.length() - 4, sb.length() - 1);
        if (emptyFilter) {
            sb.delete(0, sb.length() - 1);
        }
        return sb.toString();
    }

    private PreparedStatement buildStatement(AdFilter filter, String query) throws SQLException {
        PreparedStatement prStatement = connection.prepareStatement(query);
        int i = 1;
        if (filter.getValidUntil() != null) {
            prStatement.setDate(i, java.sql.Date.valueOf(filter.getValidUntil()));
            i++;
        }
        if (filter.getVendor() != null) {
            prStatement.setString(i, filter.getVendor());
            i++;
        }
        return prStatement;
    }

    private Ad buildOffer(ResultSet rs) throws SQLException {
        String id = rs.getString("offer_id");
        List<String> tags = readTags(id);

        ReviewsWrapper rw = readReviews(id);
        List<String> reviews = rw.getReviews();
        double rating = rw.getRating();
        return new Ad(id,
                rs.getString("offer_name"),
                rs.getString("description"),
                rs.getString("created_at"),
                rs.getString("vendor_link"),
                rs.getString("username"),
                rs.getString("photo_link"),
                tags,
                rs.getString("discount"),
                rs.getString("valid_until"),
                rating,
                reviews);
    }

    public List<Ad> getPage(int start, int top, AdFilter filter){
        String sql = "select *\n" +
                "from profit.offer\n" +
                "left join profit.user as user on offer.user_id = user.user_id\n" +
                buildFilterString(filter) +
                "order by created_at desc";
        try {
            PreparedStatement preparedStatement = buildStatement(filter, sql);
            ResultSet rs = preparedStatement.executeQuery();
            List<Ad> offers = new ArrayList<Ad>();
            while (rs.next()) {
                Ad item = buildOffer(rs);
                offers.add(item);
            }
            if (filter.getHashTags() != null && !filter.getHashTags().isEmpty()) {
                offers = offers.stream().filter(ad -> ad.getHashTags().containsAll(filter.getHashTags())).collect(Collectors.toList());

            }

            rs.close();
            preparedStatement.close();
            if (start + top > offers.size()) {
                return offers;
            }
            return offers.subList(start, start + top);
        } catch (SQLException  e) {
            e.printStackTrace();
        }
        return null;
    }

    private PreparedStatement buildAddReviewPreparedStatement(String id, Review review) throws SQLException {
        String sql = "INSERT INTO REVIEWS(USERNAME, OFFER_ID, REVIEW, RATING, review_date) VALUES (?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, review.getUsername());
        preparedStatement.setInt(2, Integer.parseInt(id));
        preparedStatement.setString(3, review.getReview());
        preparedStatement.setInt(4, review.getRating());
        preparedStatement.setTimestamp(5, java.sql.Timestamp.valueOf(review.getReviewDate()));
        return preparedStatement;
    }

    public boolean addReview(String id, Review review){
        try{

            PreparedStatement preparedStatement = buildAddReviewPreparedStatement(id, review);
            preparedStatement.executeUpdate();
            preparedStatement.close();

            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public boolean disconnect(){
        try {
            connection.close();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
