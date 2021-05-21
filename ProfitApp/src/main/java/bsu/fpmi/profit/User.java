package bsu.fpmi.profit;

public class User {
    private String username;
    private int userId;
    private boolean isVendor;
    public User(String username, int userId, boolean isVendor){
        this.isVendor = isVendor;
        this.username = username;
        this.userId = userId;
    }
    public String getUsername() {
        return username;
    }
    public int getUserId() {
        return userId;
    }
    public boolean isVendor() {
        return isVendor;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", userId='" + userId + '\'' +
                ", isVendor=" + isVendor +
                '}';
    }
}
