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
        long elapsed = System.currentTimeMillis() - startTime;

        StringBuilder log = new StringBuilder();
        log.append(((HttpServletRequest)request).getMethod()).append(" - ");
        log.append(((HttpServletRequest) request).getRequestURL()).append(" - ");
        log.append(elapsed).append("ms");
        System.out.println(log);
    }
}
