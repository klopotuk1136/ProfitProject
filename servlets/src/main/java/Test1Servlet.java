import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class Test1Servlet extends HttpServlet {
    private static final String pathToStatus = "/status";
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher(pathToStatus).forward(request, response);
    }
}