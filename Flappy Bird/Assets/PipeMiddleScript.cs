using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PipeMiddleScript : MonoBehaviour
{
    // Logic manager komponent
    public LogicScript logic;

    // Start is called before the first frame update
    void Start()
    {
        // Logic Manager kan ikke tilføjes via Unity, da alt Pipe er en prefab, og findes derfor ikke før programmet kører.
        // Logic Manager har et tag. Når pipe skabes, går den igennem hierarki og finder objektet med Logic Tag (Logic Manager), og tager scriptet.
        logic = GameObject.FindGameObjectWithTag("Logic").GetComponent<LogicScript>();
    }

    // Update is called once per frame
    void Update()
    {

    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        // kigger efter om hvad der udløste metoden var på tredje lag, hvilket er det lag Bird ligger på
        if (collision.gameObject.layer == 3)
            logic.AddScore(1);
    }
}
