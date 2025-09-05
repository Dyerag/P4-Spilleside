using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace SpilAPI.Models
{
    public class Bruger
    {
        [Key] public int BrugerId { get; set; }

        [Required]
        public required string Brugernavn { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}

