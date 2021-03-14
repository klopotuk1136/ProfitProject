import java.io.*;
import javax.servlet.http.*;

    public class CheckServlet extends HttpServlet {
        @Override
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
            response.setContentType("json");
            PrintWriter pw = response.getWriter();

            pw.println("{\"success\" :\"true\"}");
        }
    }