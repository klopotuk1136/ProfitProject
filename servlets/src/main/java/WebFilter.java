import javax.servlet.*;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

public class WebFilter implements Filter {
    public void init(FilterConfig config) throws ServletException {
    }

    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {

        long startTime = System.currentTimeMillis();
        chain.doFilter(request, response);
        long timeTaken = System.currentTimeMillis() - startTime;
        String method = ((HttpServletRequest)request).getMethod();
        String url = ((HttpServletRequest)request).getRequestURL().toString();

        System.out.printf("%s - %s - %dms%n",method, url, timeTaken);
    }
}
