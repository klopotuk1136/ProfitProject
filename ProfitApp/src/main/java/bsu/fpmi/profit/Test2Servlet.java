package bsu.fpmi.profit;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class Test2Servlet extends HttpServlet {
    private static final String PATH = "/page";
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.sendRedirect(PATH);
    }
}