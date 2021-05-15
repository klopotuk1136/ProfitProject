package bsu.fpmi.profit;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class PageServlet extends HttpServlet {
    private static final String PATH = "/page.html";
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher(PATH).forward(request, response);
    }
}