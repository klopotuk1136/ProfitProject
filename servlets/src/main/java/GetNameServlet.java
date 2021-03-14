import java.io.*;
import javax.servlet.http.*;

public class GetNameServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        String message = "Name is ";
        String name = request.getParameter("name");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>" + message + name + "</h1>");
        out.println("</body></html>");
    }
}