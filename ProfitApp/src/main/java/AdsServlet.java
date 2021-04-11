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
                    response.getWriter().print((new Gson()).toJson(adList.getAllAds()));
                    break;
                }
                case "add": {
                    GsonBuilder builder = new GsonBuilder();
                    Gson gson = builder.create();

                    String line = request.getReader().readLine();
                    System.out.println(line);
                    Ad tmpAd = (gson).fromJson(line, Ad.class);
                    System.out.println(tmpAd);
                    response.getWriter().print((gson).toJson(adList.add((gson).fromJson(line, Ad.class))));
                    break;
                }
                case "edit": {
                    Ad tmpAd = adList.getAd(request.getParameter("id"));

                    break;
                }
            }
        }

        System.out.println((new Gson()).toJson(adList.getAllAds()));
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.getWriter().print((new Gson()).toJson(adList.getAd(request.getParameter("id"))));
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.getWriter().print((new Gson()).toJson(adList.removeAd(request.getParameter("id"))));
    }
}
