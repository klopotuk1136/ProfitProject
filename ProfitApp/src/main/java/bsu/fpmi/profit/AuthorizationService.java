package bsu.fpmi.profit;

import java.sql.*;

public class AuthorizationService {
    public static boolean isPostAvailable(int offerId, int userId, Connection connection) throws OfferNotFoundException {
        try {
            String sql = "SELECT user_id FROM offer WHERE offer_id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, offerId);
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()){
                int storedUserId =  resultSet.getInt("user_id");
                return storedUserId == userId;
            }
            else {
                String message = "Offer with ID= " + offerId + " not found.";
                throw new OfferNotFoundException(offerId, message);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }
}
