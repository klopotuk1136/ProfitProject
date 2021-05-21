package bsu.fpmi.profit;

import java.sql.*;

public class LoginService {
    private static final String URL = "jdbc:mysql://localhost:3306/profit?serverTimezone=UTC";
    private static final String NAME = "root";
    private static final String PASSWORD = "123456789";

    public static User checkUserPassword(String username, String password) throws UserNotFoundException, PasswordNotMatchException {

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(URL, NAME, PASSWORD);

            String sql = "SELECT * FROM user WHERE username = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, username);
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()){
                String storedPasswordHash = resultSet.getString("password");
                if(Hasher.isHashEqual(password, storedPasswordHash)){

                    return new User(resultSet.getString("username"), resultSet.getInt("USER_ID"), resultSet.getBoolean("ISVENDOR"));
                }
                else {
                    throw new PasswordNotMatchException(username, password, "Passwords doesn't match.");
                }
            }
            else{
                throw new UserNotFoundException(username, "No such a user in DB.");
            }
        }catch (SQLException e){
            e.printStackTrace();
        }catch (ClassNotFoundException e){
            e.printStackTrace();
        }
        return null;
    }
}
