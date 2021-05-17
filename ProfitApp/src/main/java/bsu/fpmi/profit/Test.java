package bsu.fpmi.profit;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/profit?serverTimezone=UTC";
        String name = "root";
        String password = "123456789";
        ProfitCRUD profitCRUD = new ProfitCRUD(url, name, password);

        profitCRUD.connect();

        System.out.println(profitCRUD.getPage(0, 10, (new Gson()).fromJson("{}", AdFilter.class)));
    }
}
