using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace SpilAPI.Models
{
    public class Spil
    {
        [Key] 
        public int SpilId { get; set; }

        [Required] 
        public required string Navn { get; set; }
        public required string IkonNavn { get; set; }
    }
}