import java.io.*;
import javax.servlet.http.*;

public class GetNameServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        String name = request.getParameter("name");
        PrintWriter out = response.getWriter();

        if(name.length() < 100) {
            out.println("<html><body>");
            out.printf("<h1> Name is %s</h1>%n", name);
            out.println("</body></html>");
        }else{
            throw new IOException("Name is too long");
        }
    }
}