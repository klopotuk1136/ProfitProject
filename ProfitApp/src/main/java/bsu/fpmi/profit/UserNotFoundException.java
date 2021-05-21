package bsu.fpmi.profit;

public class UserNotFoundException extends Exception{
    private String username;
    public UserNotFoundException(String username, String message){
        super(message);
        this.username = username;
    }

    @Override
    public String toString() {
        return "UserNotFoundException{" +
                "username='" + username + '\'' +
                ", message=" + getMessage() +
                '}';
    }
}
