using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PipeSpawnScript : MonoBehaviour
{
    // Pipe objektet der bliver affødt. hentes fra Unity
    public GameObject pipe;
    // Hvor lang tid der skal gå, før en ny genereres
    public float spawnRate = 2;
    // Hvor lang tid var gået fra sidste dannelse
    public float timer = 0;
    // Hvor meget de fremkaldte rør må forskydes
    public float heightOffset = 10;

    // Start is called before the first frame update
    void Start()
    {
        // metoden køres én gang ved start, for at skabe det første rør når spillet begynder, i stedet for at vente
        Spawn();
    }

    // Update is called once per frame
    void Update()
    {
        if (timer < spawnRate)
        {
            // timer får tiden fra unity, specifikt får summen af sekunderne mellem hver frame
            timer += Time.deltaTime;
        }
        else
        {
            Spawn();
            // Nullstilles for igen at tælle 
            timer = 0;
        }
    }

    /// <summary>
    /// Skaber rør objektet.
    /// </summary>
    void Spawn()
    {
        // Bruger forskydelsen og Pipe Spawners position for at finde den laveste og højeste y position et par rør kan ha'.
        float lowestPoint = transform.position.y - heightOffset;
        float highestPoint = transform.position.y + heightOffset;
        // Skaber et nyt gameObject ved brug af den angivne pipe prefab, x positionen og rotationen af spawneren, og en tilfældig y værdi ved brug af lowestPoint og highestPoint.
        Instantiate(pipe, new Vector3(transform.position.x, Random.Range(lowestPoint, highestPoint), 0), transform.rotation);
    }
}
