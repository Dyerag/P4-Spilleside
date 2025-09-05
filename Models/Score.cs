using System.ComponentModel.DataAnnotations;
using System;

namespace SpilAPI.Models
{
    public class Score
    {
        [Key] public int ScoreId { get; set; }

        public int BrugerId { get; set; }

        public  Bruger? Bruger { get; set; }

        public int SpilId { get; set; }

        public  Spil? Spil { get; set; }

        [Required]
        public int Point { get; set; }

        [Required]
        public DateTime Dato { get; set; } =
            new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day, DateTime.UtcNow.Hour, DateTime.UtcNow.Minute, 0, DateTimeKind.Utc); // fjen minisekunder og sekunder ved oprettelse
    }
}

