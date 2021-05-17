package bsu.fpmi.profit;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AdsServlet extends HttpServlet {
    private final String URL = "jdbc:mysql://localhost:3306/profit?serverTimezone=UTC";
    private final String NAME = "root";
    private final String PASSWORD = "123456789";
    private ProfitCRUD profitCRUD;

    @Override
    public void init() throws ServletException {
        this.profitCRUD = new ProfitCRUD(URL, NAME, PASSWORD);
        profitCRUD.connect();
        super.init();
    }

    @Override
    public void destroy() {
        this.profitCRUD.disconnect();
        super.destroy();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("json");
        String[] uris = request.getRequestURI().split("/");

        if (uris.length == 3){
            switch (uris[2]){
                case "search": {
                    int start = (request.getParameter("start") != null) ? Integer.parseInt(request.getParameter("start")) : 0;
                    int top = (request.getParameter("top") != null) ? Integer.parseInt(request.getParameter("top")) : 10;
                    response.getWriter().print((new Gson()).toJson(profitCRUD.getPage(start, top, (new Gson()).fromJson(request.getReader().readLine(), AdFilter.class))));
                    break;
                }
                case "add": {
                    response.getWriter().print((new Gson()).toJson(profitCRUD.addOffer((new Gson()).fromJson(request.getReader().readLine(), Ad.class))));
                    break;
                }
                case "edit": {
                    response.getWriter().print((new Gson()).toJson(profitCRUD.editOffer(request.getParameter("id"),
                            (new Gson()).fromJson(request.getReader().readLine(), Ad.class))));
                    break;
                }
                case "review": {
                    response.getWriter().print((new Gson()).toJson(profitCRUD.addReview(request.getParameter("id"),
                            (new Gson()).fromJson(request.getReader().readLine(), Review.class))));
                    break;
                }
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("json");
        response.getWriter().print((new Gson()).toJson(profitCRUD.getOffer(request.getParameter("id"))));
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("json");
        response.getWriter().print((new Gson()).toJson(profitCRUD.deleteAd(request.getParameter("id"))));
    }
}
