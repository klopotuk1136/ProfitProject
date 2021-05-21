package bsu.fpmi.profit;

import com.google.gson.Gson;
import org.apache.commons.codec.binary.Base64;

import javax.servlet.http.*;
import java.io.IOException;

public class LoginServlet extends HttpServlet {
    private static final String USERNAME = "username";
    private static final String PASSWORD = "password";
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String username = request.getParameter(USERNAME);
        String encodedPassword = request.getParameter(PASSWORD);
        String password = new String(Base64.decodeBase64(encodedPassword.getBytes()));

        try {
            if (username != null && password != null) {
                logIn(username, password, request, response);
            }
        } catch (UserNotFoundException e) {
            String message = "User '" + username + "' not found.";
            response.sendError(404, message);
            e.printStackTrace();
        } catch (PasswordNotMatchException e) {
            String message = "Incorrect password.";
            response.sendError(401, message);
            e.printStackTrace();
        }
    }
    private void logIn(String username, String password, HttpServletRequest request, HttpServletResponse response) throws UserNotFoundException, PasswordNotMatchException, IOException {
        User user = LoginService.checkUserPassword(username, password);
        HttpSession session = request.getSession();
        session.setAttribute("USER", user);
        response.getWriter().println((new Gson()).toJson(user));
    }
}