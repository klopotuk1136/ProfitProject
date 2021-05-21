package bsu.fpmi.profit;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class FillPasswords {
    public static void main(String[] args) {
        String URL = "jdbc:mysql://localhost:3306/profit?serverTimezone=UTC";
        String NAME = "root";
        String PASSWORD = "123456789";

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(URL, NAME, PASSWORD);

            List<String> users = readUsers(connection);

            setPasswords(users, connection);

        }catch (ClassNotFoundException e){
            e.printStackTrace();
        } catch(SQLException e){
            e.printStackTrace();
        }
    }

    private static List<String> readUsers(Connection connection) throws SQLException {
        List<String> users = new ArrayList<>();
        String sql = "SELECT USER_ID FROM user";
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(sql);
        while(resultSet.next()){
            users.add(resultSet.getString("USER_ID"));
        }
        resultSet.close();
        statement.close();
        return users;
    }

    private static void setPasswords(List<String> users, Connection connection) throws ClassNotFoundException, SQLException {
        String sql = "UPDATE user SET password = ? WHERE USER_ID = ?";
        int i = 0;
        for(String userId : users){
            String password = Integer.toString(i++);
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, Hasher.getHash(password));
            preparedStatement.setString(2, userId);
            preparedStatement.executeUpdate();
            preparedStatement.close();
        }
    }

}
