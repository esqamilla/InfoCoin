namespace InfoCoin.Server.Models
{
    public class Category
    {
        public int CategoryId { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }

        public string Color { get; set; }

        public string EndDate { get; set; }

        public string StartDate { get; set; }

        public int TypeId { get; set; }
    }
}
