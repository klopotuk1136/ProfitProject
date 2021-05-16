package bsu.fpmi.profit;

import java.sql.*;

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
    public boolean addOffer(Ad offer){
        try {

            String sql = "select user_id from user where username = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, offer.getVendor());
            ResultSet resultSet = preparedStatement.executeQuery();


            int userId;
            if(resultSet.next()) {
                userId = resultSet.getInt("user_id");
                preparedStatement.close();
                int offerId = (int)offer.getCreatedAt().getTime();

                sql = "INSERT INTO OFFER(OFFER_ID, USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
                preparedStatement = connection.prepareStatement(sql);
                preparedStatement.setInt(1, offerId);
                preparedStatement.setInt(2, userId);
                preparedStatement.setString(3, offer.getLabel());
                preparedStatement.setString(4, offer.getDescription());
                preparedStatement.setString(5, offer.getLink());
                preparedStatement.setDate(6, new java.sql.Date(offer.getValidUntil().getTime()));
                preparedStatement.setInt(7, Integer.parseInt(offer.getDiscount()));
                preparedStatement.setTimestamp(8, new java.sql.Timestamp(offer.getCreatedAt().getTime()));
                preparedStatement.setString(9, offer.getPhotoLink());
                preparedStatement.executeUpdate();
                preparedStatement.close();


                sql = "INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (?, ?);";
                for (String tag : offer.getHashTags()) {
                    preparedStatement = connection.prepareStatement(sql);
                    preparedStatement.setInt(1, offerId);
                    preparedStatement.setString(2, tag);
                    preparedStatement.executeUpdate();
                    preparedStatement.close();
                }

                return true;
            }
        }catch(SQLException e){
            e.printStackTrace();
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

    public boolean editOffer(String id, Ad ad){
        try{
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
            preparedStatement.executeUpdate();
            preparedStatement.close();

            if(ad.getHashTags() != null) {
                editHashtags(id, ad);
            }

            return true;
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
