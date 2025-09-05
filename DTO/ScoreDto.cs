namespace SpilAPI.DTO
{
    public class ScoreDto
    {
        public required string Brugernavn { get; set; }
        public required string Spilnavn { get; set; }
        public  int Point { get; set; }
        public  DateTime Dato { get; set; }
    }
}
