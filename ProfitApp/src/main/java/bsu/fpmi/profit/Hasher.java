package bsu.fpmi.profit;

import org.apache.commons.codec.digest.DigestUtils;

public class Hasher {
    public static String getHash(String password){
        return DigestUtils.sha512Hex(password);
    }
    public static boolean isHashEqual(String password, String passwordHash){
        String specifiedPasswordHash = DigestUtils.sha512Hex(password);
        return specifiedPasswordHash.equals(passwordHash);
    }
}
