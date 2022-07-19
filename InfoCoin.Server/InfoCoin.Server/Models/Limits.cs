namespace InfoCoin.Server.Models
{
    public class Limits
    {
        public int LimitId { get; set; }

        public string LimitValue { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public int CategoryId { get; set; }
    }
}
