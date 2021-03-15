import java.io.*;
import javax.servlet.http.*;

    public class CheckServlet extends HttpServlet {
        private static final String json = "{\"success\" :\"true\"}";
        @Override
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
            response.setContentType("json");
            PrintWriter pw = response.getWriter();

            pw.println(json);
        }
    }