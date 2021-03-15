import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class PageServlet extends HttpServlet {
    private static final String pathToPage = "/WEB-INF/page.html";
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher(pathToPage).forward(request, response);
    }
}