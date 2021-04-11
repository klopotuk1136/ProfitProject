import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AdsServlet extends HttpServlet {
    private static AdList adList = new AdList();


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        String[] uris = request.getRequestURI().split("/");

        if (uris.length == 3){
            switch (uris[2]){
                case "search": {
                    int start = (request.getParameter("start") != null) ? Integer.parseInt(request.getParameter("start")) : 0;
                    int top = (request.getParameter("top") != null) ? Integer.parseInt(request.getParameter("top")) : 10;
                    String line = request.getReader().readLine();
                    adList.getPage(start, top, (new Gson()).fromJson(line, AdFilter.class)).forEach(ad -> System.out.println(ad));
                    response.getWriter().print((new Gson()).toJson(adList.getPage(start, top, (new Gson()).fromJson(line, AdFilter.class))));
                    break;
                }
                case "add": {
                    response.getWriter().print((new Gson()).toJson(adList.add((new Gson()).fromJson(request.getReader().readLine(), Ad.class))));
                    break;
                }
                case "edit": {
                    response.getWriter().print((new Gson()).toJson(adList.editAd(request.getParameter("id"),
                            (new Gson()).fromJson(request.getReader().readLine(), Ad.class))));
                    break;
                }
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().print((new Gson()).toJson(adList.getAd(request.getParameter("id"))));
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().print((new Gson()).toJson(adList.removeAd(request.getParameter("id"))));
    }
}
