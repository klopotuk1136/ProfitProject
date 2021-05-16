package bsu.fpmi.profit;

import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/profit?serverTimezone=UTC";
        String name = "root";
        String password = "123456789";
        ProfitCRUD profitCRUD = new ProfitCRUD(url, name, password);
        System.out.println(profitCRUD.connect());

        List<String> hashTags = new ArrayList<>();
        hashTags.add("lala666");
        hashTags.add("lele444");
        Ad ad = new Ad(null ,null, "desc", null, "newLink", null,
                null, hashTags, null, null, 0, null);



        System.out.println(profitCRUD.deleteAd("3"));
    }
}
