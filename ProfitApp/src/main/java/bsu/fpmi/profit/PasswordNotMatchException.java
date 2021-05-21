package bsu.fpmi.profit;

public class PasswordNotMatchException extends Exception{
    private String username;
    private String password;
    public PasswordNotMatchException(String username, String password, String message){
        super(message);
        this.username = username;
        this.password = password;
    }

    @Override
    public String toString() {
        return "PasswordNotMatchException{" +
                "username='" + username + '\'' +
                ",password='" + password + '\'' +
                ", message=" + getMessage() +
                '}';
    }
}
