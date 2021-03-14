import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class Test1Servlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("/status").forward(request, response);
    }
}