import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class Test2Servlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.sendRedirect("/page");
    }
}