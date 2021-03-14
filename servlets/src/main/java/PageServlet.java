import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class PageServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("/WEB-INF/page.html").forward(request, response);
    }
}