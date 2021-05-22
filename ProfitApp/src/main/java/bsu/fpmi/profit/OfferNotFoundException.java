package bsu.fpmi.profit;

public class OfferNotFoundException extends Exception{
    private int offerId;
    public OfferNotFoundException(int offerId, String message){
        super(message);
        this.offerId = offerId;
    }

    @Override
    public String toString() {
        return "OfferNotFoundException{" +
                "offerId=" + offerId +
                ", message=" + getMessage() +
                '}';
    }
}
