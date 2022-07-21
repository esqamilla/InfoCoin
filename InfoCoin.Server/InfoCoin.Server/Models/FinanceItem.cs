namespace InfoCoin.Server.Models
{
    public class FinanceItem
    {
        public int FinanceItemId { get; set; }

        public string Cost { get; set; }

        public string Description { get; set; }

        public string Date { get; set; }

        public int FinanceId { get; set; }

        public int CategoryId { get; set; }
    }
}
